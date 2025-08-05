import MainMenuButton from "components/Buttons/MainMenuButton/MainMenuButton";

interface Props {
}
export const FindingMatch = ({}: Props) => {
  const copyUrlToClipboard = async () => {
    let player = window.location.href[window.location.href.length-1];
    let url = `${window.location.href.substring(0,window.location.href.length-1)}${player==='x'?'o':'x'}`;
    try {
      await navigator.clipboard.writeText(url);
      console.log("URL copied!",url);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="flex justify-center text-2xl font-bold w-[500px]"></span>
      <MainMenuButton title="Copy Url" color="blue" onClick={copyUrlToClipboard} />
    </div>
  );
};
