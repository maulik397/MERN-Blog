import React from "react";
import { format } from "date-fns";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
// import "../pages/styles/all.css";
function Post({ _id, title, summary, cover, content, createdAt, author }) {
  return (
    <Card
      sx={{ width: 250 }}
      className="flex-grow-1"
      style={{ boxShadow: "rgba(2,4,12,0.3) 0px 3px 10px" }}
    >
      <Link className="link" to={`/post/${_id}`}>
        <CardMedia
          component="img"
          alt={title}
          style={{ objectFit: "contain" }}
          height="140"
          image={"http://localhost:8001/" + cover}
        />
      </Link>
      <CardContent>
        {/* <Link className="link" to={`/post/${_id}`}> */}
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        {/* </Link> */}
        <Typography variant="body2" className="two-line" color="text.secondary">
          {summary}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button> */}
        <Link className="link" to={`/post/${_id}`}>
          <Button size="small" className="button">Read More</Button>
        </Link>
      </CardActions>
    </Card>
    // <div class="container ">
    //   <div className="post">
    //     <div className="image">
    //       <Link to={`/post/${_id}`}>
    //         <img src={"http://localhost:8001/" + cover} alt="{title}" />
    //       </Link>
    //     </div>
    //     <div className="texts">
    //       <Link to={`/post/${_id}`}>
    //         <h2>{title}</h2>
    //       </Link>
    //       <p className="info">
    //         <a className="author">Created By {author.username}</a>
    //         <br></br>
    //         <time>{format(new Date(createdAt), "MMM d yyyy")}</time>
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Post;
