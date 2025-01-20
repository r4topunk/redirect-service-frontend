import TitleType from "@/components/title-type";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 max-w-full h-screen">
      <div className="min-h-[100vh] flex flex-col justify-center items-center flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <TitleType />
      </div>
    </div>
  );
}
