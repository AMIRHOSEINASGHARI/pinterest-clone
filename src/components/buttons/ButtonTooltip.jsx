//* Next Imports
import Link from "next/link";
//* Tooltip Imports
import { Tooltip } from "react-tooltip";

const ButtonTooltip = (props) => {
  const { children } = props;
  //* Common props
  const { styles, tooltipId, tooltipContent, openOnClick, toolipHide } = props;
  //* Anchor tag props
  const { isAnchorTag, anchorHref, target, download } = props;
  //* Next link tag props
  const { isNextLinkTag, nextHref } = props;
  //* Simple tag props
  const { isSimpleTag } = props;

  if (isAnchorTag) {
    return (
      <>
        <a
          data-tooltip-id={tooltipId}
          data-tooltip-content={tooltipContent}
          className={styles}
          download={download || false}
          target={target || "_blank"}
          href={anchorHref}
        >
          {children || <></>}
        </a>
        <Tooltip id={tooltipId} />
      </>
    );
  } else if (isNextLinkTag) {
    return (
      <>
        <Link
          data-tooltip-id={tooltipId}
          data-tooltip-content={tooltipContent}
          className={styles}
          href={nextHref}
        >
          {children || <></>}
        </Link>
        <Tooltip id={tooltipId} />
      </>
    );
  } else if (isSimpleTag) {
    return (
      <>
        <div
          data-tooltip-id={tooltipId}
          data-tooltip-content={tooltipContent}
          data-tooltip-delay-hide={toolipHide || 0}
          className={styles || ""}
        >
          {children || <></>}
        </div>
        <Tooltip id={tooltipId} openOnClick={openOnClick || false} />
      </>
    );
  }
};

export default ButtonTooltip;
