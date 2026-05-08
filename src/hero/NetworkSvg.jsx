import { motion } from "motion/react";

export function NetworkSvg({ stage, nodes, edges, width = 800, height = 600 }) {
  const idToNode = new Map(nodes.map((node) => [node.id, node]));
  const isRocketStage = stage === "rocket";
  const rocketOverlayOpacity = isRocketStage ? 0.9 : 0;

  return (
    <svg width={width} height={height} className="hero-anim-svg" viewBox={`0 0 ${width} ${height}`}>
      {edges.map((edge, i) => {
        const fromNode = idToNode.get(edge.from);
        const toNode = idToNode.get(edge.to);
        if (!fromNode || !toNode) return null;
        const delay = (toNode.level || 0) * 0.2;
        return (
          <motion.line
            key={`edge-${i}`}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke={isRocketStage ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.72)"}
            strokeWidth={isRocketStage ? 1.35 : 1.2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
              x1: isRocketStage ? (fromNode.targetX ?? fromNode.x) : fromNode.x,
              y1: isRocketStage ? (fromNode.targetY ?? fromNode.y) : fromNode.y,
              x2: isRocketStage ? (toNode.targetX ?? toNode.x) : toNode.x,
              y2: isRocketStage ? (toNode.targetY ?? toNode.y) : toNode.y
            }}
            transition={{
              pathLength: { duration: 0.5, delay, ease: "easeOut" },
              opacity: { duration: 0.5, delay },
              x1: { duration: 3.1, ease: "easeInOut", delay: 0.55 },
              y1: { duration: 3.1, ease: "easeInOut", delay: 0.55 },
              x2: { duration: 3.1, ease: "easeInOut", delay: 0.55 },
              y2: { duration: 3.1, ease: "easeInOut", delay: 0.55 }
            }}
          />
        );
      })}

      {nodes.map((node) => {
        const delay = (node.level || 0) * 0.25;
        const cx = isRocketStage && node.targetX ? node.targetX : node.x;
        const cy = isRocketStage && node.targetY ? node.targetY : node.y;
        const nodeRadius = isRocketStage ? (node.label ? 6 : 2.6) : (node.label ? 8 : 3);
        return (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={nodeRadius}
              fill="none"
              stroke="#ffffff"
              strokeWidth={isRocketStage ? 1.2 : (node.label ? 2 : 1)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, cx, cy }}
              transition={{
                scale: { duration: 0.45, delay },
                opacity: { duration: 0.45, delay },
                cx: { duration: 3.1, ease: "easeInOut", delay: 0.55 },
                cy: { duration: 3.1, ease: "easeInOut", delay: 0.55 }
              }}
            />
            {node.id === "center" && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={16}
                fill="rgba(255,255,255,0.18)"
                stroke="none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, cx, cy }}
                transition={{
                  scale: { duration: 0.45, delay },
                  opacity: { duration: 0.45, delay },
                  cx: { duration: 3.1, ease: "easeInOut", delay: 0.55 },
                  cy: { duration: 3.1, ease: "easeInOut", delay: 0.55 }
                }}
              />
            )}
            {node.label && stage === "network" && (
              <motion.text
                x={node.x}
                y={node.y - 20}
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontFamily="Space Mono, monospace"
                letterSpacing="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.65, delay: delay + 0.35 }}
              >
                {`→ ${node.label.toUpperCase()}`}
              </motion.text>
            )}
          </g>
        );
      })}

      <g
        transform={`translate(${width * 0.5} ${height * 0.52}) rotate(-35)`}
        style={{ opacity: rocketOverlayOpacity, transition: "opacity 500ms ease" }}
      >
        <path d="M -14 -78 L 14 -78 L 19 64 L -19 64 Z" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="1.4" />
        <path d="M -14 -78 L 0 -104 L 14 -78" fill="none" stroke="rgba(255,255,255,0.98)" strokeWidth="1.4" />
        <path d="M -18 14 L -46 32 L -16 40 Z" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="1.3" />
        <path d="M 18 14 L 46 32 L 16 40 Z" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="1.3" />
        <circle cx="2" cy="-18" r="9.5" fill="none" stroke="rgba(255,255,255,0.98)" strokeWidth="1.3" />
        <path d="M -12 82 Q 0 94 12 82" fill="none" stroke="rgba(255,255,255,0.98)" strokeWidth="1.35" />
        <path d="M -8 86 Q 0 93 8 86" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.1" />
      </g>

    </svg>
  );
}
