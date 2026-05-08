import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TypingText } from "./TypingText.jsx";
import { createNetworkData, generateRocketWireframe } from "./networkData.js";
import { NetworkSvg } from "./NetworkSvg.jsx";

const STAGE_TIMINGS = {
  networkToRocketMs: 3800,
  rocketToHeadlineDefaultMs: 4400
};

export function HeroStage() {
  const [stage, setStage] = useState("hack-nation");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const { centerX, centerY, svgWidth, svgHeight } = useMemo(() => {
    const width = 760;
    const height = 500;
    return { centerX: width * 0.5, centerY: height * 0.5, svgWidth: width, svgHeight: height };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const data = createNetworkData(centerX, centerY);
      const rocket = generateRocketWireframe(centerX, centerY);
      setEdges(data.edges);
      setNodes(
        data.nodes.map((node, idx) => ({
          ...node,
          targetX: rocket[idx % rocket.length].x,
          targetY: rocket[idx % rocket.length].y
        }))
      );
      setStage("rocket");
    }
  }, [centerX, centerY]);

  useEffect(() => {
    if (stage === "network") {
      const data = createNetworkData(centerX, centerY);
      setNodes(data.nodes);
      setEdges(data.edges);

      const timer = setTimeout(() => setStage("rocket"), STAGE_TIMINGS.networkToRocketMs);
      return () => clearTimeout(timer);
    }

    if (stage === "rocket") {
      const rocketPoints = generateRocketWireframe(centerX, centerY);
      setNodes((prev) =>
        prev.map((node, index) => ({
          ...node,
          targetX: rocketPoints[index % rocketPoints.length].x,
          targetY: rocketPoints[index % rocketPoints.length].y
        }))
      );
      const timer = setTimeout(() => {
        setStage("headline-default");
      }, STAGE_TIMINGS.rocketToHeadlineDefaultMs);
      return () => clearTimeout(timer);
    }

    if (stage === "headline-default") return undefined;
    return undefined;
  }, [stage, centerX, centerY]);

  const isTypingStage = stage === "hack-nation" || stage === "h-n" || stage === "you-infinity";
  const showGraph = stage === "network" || stage === "rocket";

  const headlineNode = (() => {
    if (stage === "hack-nation") {
      return <TypingText text="Hack-Nation" speed={120} onComplete={() => setStage("h-n")} />;
    }
    if (stage === "h-n") {
      return <TypingText text="H-N" speed={120} onComplete={() => setStage("you-infinity")} />;
    }
    if (stage === "you-infinity") {
      return <TypingText text="You-∞" speed={120} onComplete={() => setStage("network")} />;
    }
    if (stage === "network") return "You-∞";
    if (stage === "rocket") return "Sounds like the next unicorn";
    return "From global AI hackathon to venture";
  })();

  return (
    <div className="hero-loop-grid">
      <div className="hero-copy-pane">
        <div className="hero-title-row">
          <AnimatePresence mode="wait">
            <motion.p
              key={stage}
              className={`eyebrow ${isTypingStage ? "hero-typed-inline" : ""}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.55 }}
            >
              {headlineNode}
            </motion.p>
          </AnimatePresence>
          <span className="hero-chevron" aria-hidden="true">
            ⌄
          </span>
        </div>
        <div className="hero-cities hero-cities-static" aria-label="Host cities">
          <div className="cities-marquee">
            <div className="cities-list">
              <span>Oxford</span>
              <span>Cambridge (MIT)</span>
              <span>NYC</span>
              <span>Paris</span>
              <span>London</span>
              <span>Dresden</span>
            </div>
            <div className="cities-list" aria-hidden="true">
              <span>Oxford</span>
              <span>Cambridge (MIT)</span>
              <span>NYC</span>
              <span>Paris</span>
              <span>London</span>
              <span>Dresden</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-right-graphic">
        <div className="hero-network-box container">
          {showGraph ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="hero-graph-wrap"
            >
              <NetworkSvg stage={stage} nodes={nodes} edges={edges} width={svgWidth} height={svgHeight} />
            </motion.div>
          ) : (
            <div className="hero-graph-placeholder" />
          )}
        </div>
      </div>
    </div>
  );
}
