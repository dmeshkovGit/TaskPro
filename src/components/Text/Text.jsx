import css from "./Text.module.css";
export default function Text() {
  return (
    <div className={css.textContainer}>
      <p className={css.text}>
        Before starting your project, it is essential
        <span className={css.markText}>to create a board</span> to visualize and
        track all the necessary tasks and milestones. This board serves as a
        powerful tool to organize the workflow and ensure effective
        collaboration among team members.
      </p>
    </div>
  );
}
