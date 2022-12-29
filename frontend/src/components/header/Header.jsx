import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  // for search bar
  const [destination, setDestination] = useState("");
  // to open and close date ilog box when clicked
  const [openDate, setOpenDate] = useState(false);
  // to set the date in date dialog box
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  // to open and close options dialog box when clicked
  const [openOptions, setOpenOptions] = useState(false);
  // to set values in options dialog box
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  // for navigating the users to any page
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // function to change the values in option dialog box
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  // function to handle search
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    // when the search bar button is clicked with right information, user will be directed to the /hotels route with those informations
    navigate("/hotels", { state: { destination, dates, options } });
  };

  // for going to the login route
  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <Link className="headerList" to="/">
              <span>Stays</span>
            </Link>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <Link className="headerList" to="/flights">
              <span>Flights</span>
            </Link>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <Link className="headerList" to="/carRentals">
              <span>Car rentals</span>
            </Link>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <Link className="headerList" to="attractions">
              <span>Attractions</span>
            </Link>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <Link className="headerList" to="airportTaxis">
              <span>Airport taxis</span>
            </Link>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Booking account
            </p>
            {!user && (
              <button onClick={handleClick} className="headerBtn">
                Sign in / Login
              </button>
            )}

            {/* Search bar  */}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  /* using react date feature to bring date dailog box  */
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      {/* making custom option dailog box */}
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
