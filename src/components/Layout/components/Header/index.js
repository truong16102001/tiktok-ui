import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import image from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { useEffect, useState } from "react";
import AccountItem from "~/components/AccountItem";
import Button from "~/components/Button";

import {
  faCircleXmark,
  faSpinner,
  faMagnifyingGlass,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import "tippy.js/dist/tippy.css"; // optional
import Tippy from "@tippyjs/react/headless"; // different import path!
const cx = classNames.bind(styles);

function Header() {
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([1, 2, 3]);
    }, 3000);
  }, []);

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <img src={image.logo} alt="Tiktok" />
        <div className={cx("search")}>
          <Tippy
            interactive
            visible={searchResult.length > 0}
            render={(attributes) => (
              <div
                className={cx("search-result")}
                tabIndex="-1"
                {...attributes}
              >
                <PopperWrapper>
                  <h4 className={cx("search-title")}>Accounts</h4>
                  <AccountItem />
                  <AccountItem />
                  <AccountItem />
                </PopperWrapper>
              </div>
            )}
          >
            <input
              placeholder="Search accounts and videos"
              spellCheck={false}
            />
          </Tippy>

          <button className={cx("clear")}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />

          <button className={cx("search-btn")}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className={cx("actions")}>
          <Button text>Upload</Button>
          <Button primary rightIcon={ <FontAwesomeIcon icon={faSignIn} />}>Log in</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
