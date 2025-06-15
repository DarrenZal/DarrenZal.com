import { classNames } from "../util/lang";
import { QuartzComponentConstructor, QuartzComponentProps } from "./types";

function Spacer({ displayClass }: QuartzComponentProps) {
	return <div class={classNames(displayClass, "spacer")}></div>;
}

export default ((() => Spacer) satisfies QuartzComponentConstructor);
