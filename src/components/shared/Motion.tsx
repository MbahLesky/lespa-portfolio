"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

export const MotionDiv = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
    function MotionDiv(props, ref) {
        return <motion.div ref={ref} {...props} />;
    }
);
