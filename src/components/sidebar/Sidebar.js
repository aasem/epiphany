import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <section className="side-bar">
      <h2 className="sidebar-title">What is Epiphany?</h2>
      <p className="sidebar-text">
      Epiphany is a cutting-edge, AI-driven virtual assistant crafted to amplify strategic communication workflows. Except Strategico, the default conversational aide, all five specialized assistants are designed to deliver tailored responses based on a single prompt.
      </p>
      <h2 className="sidebar-title">Our Assistants:</h2>
      <ul className="sidebar-assistant-list">
        <li><b>Strategico:</b> Stratcommm all-rounder.</li>
        <li><b>Khoji:</b> Narratives and counternarratives.</li>
        <li><b>Naqqash:</b> Expert campaign designer.</li>
        <li><b>Likhari:</b> Writing assistant.</li>
        <li><b>Fankar:</b> Content development ideas.</li>
        <li><b>Naqqad:</b> Critical evaluator of campaigns.</li>
      </ul>
      <h2 className="sidebar-title">Recommnded Workflow:</h2>
      <ol className="sidebar-numbered-list">
        <li>Generate narratives and potential counternarratives.</li>
        <li>Pick and choose from the narratives.</li>
        <li>Lines of pursuance for each narrative.</li>
        <li>Appropriate messages for each line.</li>
        <li>End to end campaign strategy.</li>
        <li>Campaign evaluation.</li>
        <li>Necessary review.</li>
        <li>Content development ideas.</li>
      </ol>
      <h1 className="sidebar-goldenrule">GOLDEN RULE: WHEN IN DOUBT, ASK STRATEGICO</h1>
    </section>
  );
}

export default Sidebar;