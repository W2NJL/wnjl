import React from 'react';
import PublicLayout from '../layouts/public/PublicLayout';
import './About.css'; // Assuming you have a CSS file for styling

export default function About() {
  return (

      <div className="about-container">
        <h1>About WNJL.com Radio</h1>
        <p>
       WNJL.com Radio began broadcasting Smooth Jazz on September 23, 2001. We streamed Smooth Jazz via the Shoutcast platform, aiming to deliver a curated
       playlist of Smooth Jazz worldwide, encapsulating the sound of the Smooth Jazz radio stations prominent at the time.
        </p>
        <p>
          On July 4, 2024, WNJL.com Radio relaunched, again bringing Smooth Jazz worldwide.  There are many, many more internet radio stations playing Smooth Jazz now,
          but we invite you to experience our blend.  We believe there is still room for an intentional, determined mix of Smooth Jazz, expertly programmed, not a random playlist,
          merging the classic sound of the format with some of the new stars of today.
        </p>
        <p>
          Email me at nick at wnjl dot com with any questions!
        </p>
      </div>

  );
}