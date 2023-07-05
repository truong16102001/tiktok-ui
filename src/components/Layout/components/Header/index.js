import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import image from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { useEffect, useState } from "react";
import AccountItem from "~/components/AccountItem";
import Button from "~/components/Button";
import Menu from "~/components/Popper/Menu";

import {
  faCircleXmark,
  faSpinner,
  faMagnifyingGlass,
  faSignIn,
  faEllipsisVertical,
  faLanguage,
  faCircleQuestion,
  faKeyboard,
  faCloudUpload,
  faUser,
  faCoins,
  faGear,
  faSignOut,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

import "tippy.js/dist/tippy.css"; // optional
import HeadlessTippy from "@tippyjs/react/headless"; // different import path!
import Tippy from "@tippyjs/react"; // different import path!
import "tippy.js/dist/tippy.css"; // optional
const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faLanguage} />,
    title: "English",
    children: {
      title: "Language",
      data: [
        {
          type: "language",
          code: "en",
          title: "English",
        },
        {
          type: "language",
          code: "vi",
          title: "Tiếng Việt",
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Feedback and Help",
    to: "/feedback",
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: "Keyboard Shortcuts",
  },
];
function Header() {
  const currentUser = true;
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([1, 2, 3]);
    }, 3000);
  }, []);

  const handleMenuChange = (menuItem) => {
    console.log(menuItem);
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View Profile",
      to: "/userProfile",
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: "Get Coins",
      to: "/coin",
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Settings",
      to: "/settings",
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: "Logout",
      to: "/logout",
      separate:true
    },
  ];
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <img src={image.logo} alt="Tiktok" />

        <HeadlessTippy
          interactive
          offset={[10,3]}
          visible={searchResult.length > 0}
          render={(attributes) => (
            <div className={cx("search-result")} tabIndex="-1" {...attributes}>
              <PopperWrapper>
                <h4 className={cx("search-title")}>Accounts</h4>
                <AccountItem />
                <AccountItem />
                <AccountItem />
              </PopperWrapper>
            </div>
          )}
        >
          <div className={cx("search")}>
            <input
              placeholder="Search accounts and videos"
              spellCheck={false}
            />
            <button className={cx("clear")}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
            <button className={cx("search-btn")}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </HeadlessTippy>

        <div className={cx("actions")}>
          {currentUser ? (
            <>
              <Tippy delay={[0, 200]}  content="Upload video" placement="bottom">
                <button className={cx("action-btn")}>
                  <FontAwesomeIcon icon={faCloudUpload} />
                </button>
              </Tippy>
              <Tippy delay={[0, 200]}  content="Message" placement="bottom">
                <button className={cx("action-btn")}>
                  <FontAwesomeIcon icon={faMessage} />
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button text>Upload</Button>
              <Button primary rightIcon={<FontAwesomeIcon icon={faSignIn} />}>
                Log in
              </Button>
            </>
          )}
          <Menu items={currentUser ? userMenu :MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <img
                src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/71fecf1d7410012409f33914375d3903.jpeg?x-expires=1688544000&x-signature=HFpFRjxHhN%2BOuVIMxVsyd6gm93c%3D"
                className={cx("user-avatar")}
                alt="avt"
              />
            ) : (
              <button className={cx("more-btn")}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
