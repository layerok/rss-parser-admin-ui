import {inject, observer} from "mobx-react";
import {useNavigate} from "react-router-dom";

const CreatePostRaw = (
    {
        PostsStore: {
            store,
        }
    }
) => {
    const navigate = useNavigate();

    const handleEdit = (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const title = fd.get('title');
        const description = fd.get('description');
        const data = {
            title,
            description
        };
        store(data).then(() => {
            navigate('/admin/posts');
        });
    }

    return <>
        <h3>Create post</h3>
        <form onSubmit={handleEdit}>
            <div>
                <label>
                    title: <br/>
                    <input type="text" name="title" />
                </label>
            </div>
            <div>
                <label>
                    description: <br/>
                    <textarea
                        name="description"
                        id=""
                        cols="30"
                        rows="10"
                    />
                </label>
            </div>
            <div>
                <label>
                    <button>Create</button>
                    <button onClick={() => {
                        navigate('/admin/posts')
                    }}>Back</button>
                </label>
            </div>

        </form>

    </>

}

export const CreatePost = inject('PostsStore')(observer(CreatePostRaw));
