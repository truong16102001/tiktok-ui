import "tippy.js/dist/tippy.css"; // optional
import Tippy from "@tippyjs/react/headless"; // different import path!
import { Wrapper as PopperWrapper } from "~/components/Popper";

import styles from "./Menu.module.scss";
import classNames from "classnames/bind";
import MenuItem from "./MenuItem";

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
    const renderItems = () => {
        return items.map((item, index) => <MenuItem key={index} data={item} />);
    };

  return (
    <Tippy
      interactive
      delay={[0, 500]}
      placement="bottom-end"
      render={(attributes) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attributes}>
          <PopperWrapper className={cx("menu-popper")}>
            {renderItems()}
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
