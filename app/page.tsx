import { DividerTabs } from "@/components/divider-tabs";
import { MarginScribble } from "@/components/margin-scribble";
import { CoverPage } from "@/components/cover-page";
import { DearDiary } from "@/components/dear-diary";
import { Checklist } from "@/components/checklist";
import { StickyNotes } from "@/components/sticky-notes";
import { LearningLog } from "@/components/learning-log";
import { PassANote } from "@/components/pass-a-note";
import { DoodleChat } from "@/components/doodle-chat";

export default function Page() {
  return (
    <>
      <DividerTabs />
      <MarginScribble />
      <main>
        <CoverPage />
        <DearDiary />
        <Checklist />
        <StickyNotes />
        <LearningLog />
        <PassANote />
      </main>
      <DoodleChat />
    </>
  );
}
