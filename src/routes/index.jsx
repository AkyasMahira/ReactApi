import { Routes, Route } from "react-router-dom";

import Home from "../views/home";

import PostIndex from "../views/posts/index";
import PostCreate from "../views/posts/create";
import PostEdit from "../views/posts/edit";

function RoutesIndex() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostIndex />} />
            <Route path="/posts/create" element={<PostCreate />} />
            <Route path="/posts/edit/:id" element={<PostEdit />} />
        </Routes>
    )
}

export { RoutesIndex as Routes };