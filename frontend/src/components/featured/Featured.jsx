import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  // Fetching data from database
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=patna,goa,mumbai"
  );
  // console.log(data);

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://analyticsonline.in/blog/wp-content/uploads/2021/04/Property-in-Patna-Steps-Ahead-with-Wonderful-Property-Investment.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Patna</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://www.nomadasaurus.com/wp-content/uploads/2021/04/Fiirst-Timers-Guide-to-Goa.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Goa</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://lp-cms-production.imgix.net/image_browser/Mumbai_nightlife_S.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Mumbai</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
