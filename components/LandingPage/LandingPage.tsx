import { useState, useEffect } from "react";
import { NewReleases } from "../../shared/types";
import { CreateOrJoinRoom } from "./CreateOrJoinRoom/CreateOrJoinRoom";
import { SpotifyBannerNewReleases } from "./SpotifyBannerNewReleases/SpotifyBannerNewReleases";

async function getNewReleases() {
  const res = await fetch("/api/fake_get_new_releases");

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const LandingPage = () => {
  const [newReleases, setNewReleases] = useState<NewReleases>();

  // After initial rendering
  useEffect(() => {
    getNewReleases().then((releases: NewReleases) => {
      setNewReleases(releases);
    });
  }, []);

  return (
    <div>
      <SpotifyBannerNewReleases newReleases={newReleases} />
      <CreateOrJoinRoom />
    </div>
  );
};
