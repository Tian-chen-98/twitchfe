import React from "react";
import { Button, Card, List, message, Tabs, Tooltip } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { addFavoriteItem, deleteFavoriteItem } from "../utils";

const { TabPane } = Tabs;
// three tabs: stream, video, clip
const tabKeys = {
  Streams: "stream",
  Videos: "videos",
  Clips: "clips",
};

const processUrl = (url) =>
  url
    .replace("%{height}", "252")
    .replace("%{width}", "480")
    .replace("{height}", "252")
    .replace("{width}", "480");

const renderCardTitle = (item, loggedIn, favs = [], favOnChange) => {
  const title = `${item.broadcaster_name} - ${item.title}`;

  const isFav = favs.find((fav) => {
    return fav.id === item.id;
  });

  // according to whether favorited, title will show add/remove fav
  const handleFavOnClick = () => {
    if (isFav) {
      deleteFavoriteItem(item)
        .then(() => {
          favOnChange();
        })
        .catch((err) => {
          message.error(err.message);
        });
      return;
    }
    addFavoriteItem(item)
      .then(() => {
        favOnChange();
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <>
      {loggedIn && (
        <Tooltip
          title={isFav ? "Remove from favorite list" : "Add to favorite list"}
        >
          <Button
            shape="circle"
            icon={isFav ? <StarFilled /> : <StarOutlined />}
            onClick={handleFavOnClick}
          />
        </Tooltip>
      )}
      <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: 450 }}>
        <Tooltip title={title}>
          <span>{title}</span>
        </Tooltip>
      </div>
    </>
  );
};

const renderCardGrid = (data, loggedIn, favs, favOnChange) => {
  return (
    <List
      grid={{
        xs: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 2,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginRight: "20px" }}>
          <Card title={renderCardTitle(item, loggedIn, favs, favOnChange)}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img
                alt="Placeholder"
                src={processUrl(item.thumbnail_url)}
                // style={{ width: 360, height: 252 }}
              />
            </a>
          </Card>
        </List.Item>
      )}
    />
  );
};

const Home = ({ resources, loggedIn, favoriteItems, favoriteOnChange }) => {
  const { VIDEO, STREAM, CLIP } = resources;
  const {
    VIDEO: favVideos,
    STREAM: favStreams,
    CLIP: favClips,
  } = favoriteItems;

  return (
    <Tabs defaultActiveKey={tabKeys.Streams}>
      <TabPane
        tab="Streams"
        key={tabKeys.Streams}
        style={{ overflow: "auto" }}
        forceRender={true}
      >
        {renderCardGrid(STREAM, loggedIn, favStreams, favoriteOnChange)}
      </TabPane>
      <TabPane
        tab="Videos"
        key={tabKeys.Videos}
        style={{ overflow: "auto" }}
        forceRender={true}
      >
        {renderCardGrid(VIDEO, loggedIn, favVideos, favoriteOnChange)}
      </TabPane>
      <TabPane
        tab="Clips"
        key={tabKeys.Clips}
        style={{ overflow: "auto" }}
        forceRender={true}
      >
        {renderCardGrid(CLIP, loggedIn, favClips, favoriteOnChange)}
      </TabPane>
    </Tabs>
  );
};

export default Home;
