"use client";

import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({
  data,
  position = "left",
}: {
  data: { title: string; content: React.ReactNode }[];
  position?: "left" | "right";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  /**
   * @author Andika Dwi Saputra
   * @description Get the height of the timeline
   */

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-10 md:pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex justify-start pt-6 md:pt-40 md:gap-10 ${
              position === "right" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`sticky flex flex-col md:flex-row z-40 items-center top-20 md:top-40 self-start max-w-xs lg:max-w-sm md:w-full ${
                position === "right" ? "items-end" : ""
              }`}
            >
              <div
                className={`h-6 md:h-10 absolute ${
                  position === "left"
                    ? "left-2 md:left-3"
                    : "right-2 md:right-3"
                } w-6 md:w-10 rounded-full bg-[var(--background)] dark:bg-[var(--background)] flex items-center justify-center border-2 border-[var(--accent)]`}
              >
                <div className="h-2 w-2 md:h-4 md:w-4 rounded-full bg-[var(--accent)] border border-[var(--accent)] p-1 md:p-2" />
              </div>
              <h3
                className={`hidden align-las md:block text-xl ${
                  position === "left"
                    ? "md:pl-20 !text-left"
                    : "md:pr-20 !text-right"
                } md:text-2xl font-bold text-[var(--text)]`}
              >
                {item.title}
              </h3>
            </div>

            <div
              className={`relative ${
                position === "left"
                  ? "pl-12 pr-2 md:pl-4 md:pr-4"
                  : "pr-12 pl-2 md:pr-4 md:pl-4"
              } w-full`}
            >
              <h3
                className={`md:hidden block text-lg mb-2 font-bold text-[var(--text)] ${
                  position === "left" ? "text-left" : "text-right"
                }`}
              >
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className={`absolute ${
            position === "left" ? "md:left-8 left-5" : "md:right-8 right-5"
          } top-0 overflow-hidden w-[1px] md:w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-[var(--foreground)] to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]`}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[1px] md:w-[2px] bg-gradient-to-t from-[var(--accent)] via-[var(--accent)] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
