import { useEffect } from "react";

export default function ChatWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/uu1helgftwhdghuufgivlcmljeswb4vp.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return null;
}