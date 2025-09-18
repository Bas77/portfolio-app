/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef } from 'react';
import Matter, {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  Mouse,
  MouseConstraint,
  IChamferableBodyDefinition,
  Events,
} from 'matter-js';

// Define the shape of a gacha game object
interface GachaGame {
  name: string;
  imageSrc: string;
}

interface GachaBallPhysicsProps {
  gachaGames: GachaGame[];
}

const GachaBallPhysics: React.FC<GachaBallPhysicsProps> = ({ gachaGames }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) {
      console.error('Canvas or container ref is null');
      return;
    }

    // Initialize Matter.js
    const engine: Engine = Matter.Engine.create();
    const world: Matter.World = engine.world;

    // Set initial dimensions with fallback
    const containerWidth: number = containerRef.current.offsetWidth || 800;
    const containerHeight: number = 400;

    // Create renderer with type-safe options
    const render: Matter.Render = Matter.Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: containerWidth,
        height: containerHeight,
        wireframes: false,
        background: 'transparent',
        pixelRatio: 1,
      },
    });

    // Set canvas attributes for focus and interactivity
    const canvas = render.canvas;
    canvas.width = containerWidth;
    canvas.height = containerHeight;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    canvas.style.display = 'block';
    canvas.tabIndex = 0;
    canvas.style.pointerEvents = 'auto';

    // Create boundaries with thicker walls to prevent tunneling
    const boundaryOptions: IChamferableBodyDefinition = { isStatic: true, render: { visible: false } };
    const boundaryThickness = 100;
    const ground: Matter.Body = Bodies.rectangle(
      containerWidth / 2,
      containerHeight + boundaryThickness / 2,
      containerWidth,
      boundaryThickness,
      boundaryOptions
    );
    const leftWall: Matter.Body = Bodies.rectangle(
      0,
      containerHeight / 2,
      boundaryThickness,
      containerHeight,
      boundaryOptions
    );
    const rightWall: Matter.Body = Bodies.rectangle(
      containerWidth,
      containerHeight / 2,
      boundaryThickness,
      containerHeight,
      boundaryOptions
    );
    const ceiling: Matter.Body = Bodies.rectangle(
      containerWidth / 2,
      -boundaryThickness / 2,
      containerWidth,
      boundaryThickness,
      boundaryOptions
    );

    // Set collision filter for boundaries
    const boundaryCollisionFilter: IChamferableBodyDefinition['collisionFilter'] = {
      category: 0x0002,
      mask: 0x0001,
    };
    [ground, leftWall, rightWall, ceiling].forEach((boundary) => {
      Matter.Body.set(boundary, { collisionFilter: boundaryCollisionFilter });
    });

    // Create balls with images and collision filter for dragging
    const ballOptions: IChamferableBodyDefinition = {
      restitution: 0.8,
      friction: 0.1,
      collisionFilter: {
        group: 0,
        category: 0x0001,
        mask: 0x0001 | 0x0002,
      },
    };
    const balls: Matter.Body[] = gachaGames.map((game) => {
      const x: number = Math.random() * (containerWidth - 100) + 50;
      const y: number = Math.random() * (containerHeight - 100) + 50;
      const ball = Bodies.circle(x, y, 75, {
        ...ballOptions,
        render: {
          sprite: {
            texture: game.imageSrc,
            xScale: 0.3,
            yScale: 0.3,
          },
        },
      });
      // Preload image to catch errors
      const img = new Image();
      img.src = game.imageSrc;
      img.onerror = () => console.error(`Failed to load image: ${game.imageSrc}`);
      img.onload = () => console.log(`Loaded image: ${game.imageSrc}`);
      return ball;
    });

    // Add bodies to world
    World.add(world, [ground, leftWall, rightWall, ceiling, ...balls]);

    // Add mouse interaction
    const mouse: Matter.Mouse = Mouse.create(canvas);
    const mouseConstraint: Matter.MouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: true }, // Debug: Set to true to visualize constraint
      },
      collisionFilter: {
        mask: 0x0001,
      },
    });
    World.add(world, mouseConstraint);
    render.mouse = mouse;

    // Fix mouse scaling for CSS full-width
    const scaleX = containerWidth / canvas.offsetWidth;
    const scaleY = containerHeight / canvas.offsetHeight;
    Mouse.setScale(mouse, { x: scaleX, y: scaleY });

    // Remove Matter.js internal wheel listeners to allow scrolling
    // (No need to remove 'mousewheel' listeners as Matter.Mouse no longer exposes 'mousewheel' property)

    // Release ball when mouse leaves canvas
    const handleMouseLeave = () => {
  // Check if a body is currently being dragged
  if (mouseConstraint.body) {
    // Set the mouse button to -1 to simulate a mouse up event
    mouse.button = -1;

    // Manually release the body
    (mouseConstraint as any).body = null;
    (mouseConstraint as any).constraint.pointA = null;

    console.log('Mouse left canvas, correctly released the body.');
  }
};

canvas.addEventListener('mouseleave', handleMouseLeave);

    // Limit ball velocity and position to prevent escaping
    const maxVelocity = 10;
    Events.on(engine, 'afterUpdate', () => {
      balls.forEach((ball) => {
        // Clamp velocity
        const velocity = ball.velocity;
        const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
        if (speed > maxVelocity) {
          const factor = maxVelocity / speed;
          Matter.Body.setVelocity(ball, {
            x: velocity.x * factor,
            y: velocity.y * factor,
          });
        }
        // Clamp position to stay within bounds
        const radius = 10;
        const pos = ball.position;
        if (pos.x < radius) {
          Matter.Body.setPosition(ball, { x: radius, y: pos.y });
          Matter.Body.setVelocity(ball, { x: 0, y: velocity.y });
        } else if (pos.x > containerWidth - radius) {
          Matter.Body.setPosition(ball, { x: containerWidth - radius, y: pos.y });
          Matter.Body.setVelocity(ball, { x: 0, y: velocity.y });
        }
        if (pos.y < radius) {
          Matter.Body.setPosition(ball, { x: pos.x, y: radius });
          Matter.Body.setVelocity(ball, { x: velocity.x, y: 0 });
        } else if (pos.y > containerHeight - radius) {
          Matter.Body.setPosition(ball, { x: pos.x, y: containerHeight - radius });
          Matter.Body.setVelocity(ball, { x: velocity.x, y: 0 });
        }
      });
    });

    // Handle wheel events for Lenis scrolling
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.scrollTo((window as any).lenis.scroll + event.deltaY * -1);
      } else {
        window.scrollBy(0, event.deltaY);
      }
    };
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    // Run the engine and renderer
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !canvas || !render.options) return;

      const newWidth: number = containerRef.current.offsetWidth || 800;
      canvas.width = newWidth;
      render.options.width = newWidth;
      canvas.style.width = `${newWidth}px`;

      // Update boundary positions
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: containerHeight + boundaryThickness / 2 });
      Matter.Body.setPosition(leftWall, { x: 0, y: containerHeight / 2 });
      Matter.Body.setPosition(rightWall, { x: newWidth, y: containerHeight / 2 });
      Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -boundaryThickness / 2 });

      // Update boundary vertices
      Matter.Body.setVertices(
        ground,
        Bodies.rectangle(newWidth / 2, containerHeight + boundaryThickness / 2, newWidth, boundaryThickness, boundaryOptions).vertices
      );
      Matter.Body.setVertices(
        rightWall,
        Bodies.rectangle(newWidth, containerHeight / 2, boundaryThickness, containerHeight, boundaryOptions).vertices
      );

      // Update mouse scale
      Mouse.setScale(mouse, { x: newWidth / canvas.offsetWidth, y: containerHeight / canvas.offsetHeight });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      Runner.stop(runner);
      Render.stop(render);
      World.clear(world, false);
      Engine.clear(engine);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [gachaGames]);

  return (
    <section id="gacha-games" className="mb-16 relative z-20">
      <h2 className="text-3xl font-bold mb-8 relative inline-block">
        My Games
        <span className="absolute bottom-[-8px] left-0 w-1/2 h-1 bg-blue-500"></span>
      </h2>
      <div ref={containerRef} className="w-full h-[400px] relative">
        <canvas ref={canvasRef} className="absolute top-0 left-0" data-lenis-prevent />
      </div>
    </section>
  );
};

export default GachaBallPhysics;