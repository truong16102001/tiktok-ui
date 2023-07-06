import AccountItem from "~/components/AccountItem";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { useState, useEffect, useRef } from "react";
import styles from "./Search.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import "tippy.js/dist/tippy.css"; // optional
import HeadlessTippy from "@tippyjs/react/headless"; // different import path!
import { useDebounce } from "~/hooks";

const cx = classNames.bind(styles);
function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();
  
  // ngừng gõ 600 milisecond thì giá trị của searchValue mới gán cho debounce
  const debounced = useDebounce(searchValue, 600);

  useEffect(() => {
    if(!debounced.trim()){
        setSearchResult([]);
        return;
    }

    setLoading(true);

    fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
      .then((res) => res.json())
      .then((res) => {
        setSearchResult(res.data);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
  }, [debounced]);

  function handleClear() {
    setSearchValue("");
    inputRef.current.focus();
    setSearchResult([]);
  }

  function handleHideResult() {
    setShowResult(false);
  }



  return (
    <HeadlessTippy
      interactive
      offset={[10, 3]}
      visible={showResult && searchResult.length > 0}
      render={(attributes) => (
        <div className={cx("search-result")} tabIndex="-1" {...attributes}>
          <PopperWrapper>
            <h4 className={cx("search-title")}>Accounts</h4>

            {searchResult.map((result) => (
              <AccountItem key={result.id} data={result} />
            ))}
          </PopperWrapper>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div className={cx("search")}>
        <input
          ref={inputRef}
          value={searchValue}
          placeholder="Search accounts and videos"
          spellCheck={false}
          onChange={(e) => { if (!e.target.value.startsWith(' '))
           { setSearchValue(e.target.value); } }} 
          onFocus={() => setShowResult(true)}
        />

        {!!searchValue && !loading && (
          <button className={cx("clear")} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}

        {loading && <FontAwesomeIcon className={cx("loading")} icon={faSpinner} /> }
        <button className={cx("search-btn")}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
