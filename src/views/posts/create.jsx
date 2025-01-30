import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Api from "../../api"

export default function PostsCreate(){
    const [ image, setImage ] = useState("");
    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");

    const[error, setError] = useState([]);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            console.log("Selected file:", file);
            setImage(file);
        }
    }

    const storePost = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("content", content);

        await Api.post("/posts", formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }
        ).then((response) => {
            navigate("/posts");
        }).catch((error) => {
            setError(error.response.data.message);
        });
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={storePost}>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" className="form-control" onChange={handleFileChange} />
                                    {
                                        error.image && (
                                            <div className="alert alert-danger mt-2">
                                                {error.image}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} />
                                    {
                                        error.title && (
                                            <div className="alert alert-danger mt-2">
                                                {error.title}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Content</label>
                                    <textarea className="form-control" onChange={(e) => setContent(e.target.value)}
                                    placeholder="Content post"></textarea>
                                    {
                                        error.content && (
                                            <div className="alert alert-danger mt-2">
                                                {error.content}
                                            </div>
                                        )
                                    }
                                </div>
                                <button type="submit" className="btn btn-md rounded-sm shadow border-0 btn-primary">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}