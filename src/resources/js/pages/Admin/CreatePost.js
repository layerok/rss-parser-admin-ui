import {inject, observer} from "mobx-react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const CreatePostRaw = (
    {
        PostsStore: {
            store,
        }
    }
) => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const handleEdit = (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const title = fd.get('title');
        const description = fd.get('description');
        const link = fd.get('link');
        const pubDate = fd.get('pubDate');
        const categories = fd.getAll('categories');
        const data = {
            title,
            description,
            link,
            pubDate,
            categories
        };
        store(data).then(() => {
            navigate('/admin/posts');
        });
    }

    return <>
        <h3>Create post</h3>
        <form style={{display: 'flex'}} onSubmit={handleEdit}>
            <div>
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
                        link: <br/>
                        <input type="text" name="link"/>

                    </label>
                </div>
                <div>
                    <label>
                        publication date: <br/>
                        <input type="text" name="pubDate"/>

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
            </div>


            <div style={{marginLeft: "36px"}}>

                categories: <br/>
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <button title={"delete category"} onClick={(e) => {
                                e.preventDefault();
                                setCategories([...categories].filter(item=> item.id !== category.id));
                            }}>-</button>&nbsp;
                            <input type="hidden" name={`categories`} value={category.title}/>
                            {category.title}
                        </li>
                    ))}
                    <li><input value={category} onInput={(e) => {
                        setCategory(e.currentTarget.value);
                    }
                    } type="text"/>
                        <button onClick={(e) => {
                            e.preventDefault();
                            if(category) {
                                setCategories([...categories, {
                                    title: category,
                                    id: Math.floor(Math.random() * 100)
                                }])
                                setCategory("");
                            }
                        }}>add category</button></li>
                </ul>


            </div>

        </form>

    </>

}

export const CreatePost = inject('PostsStore')(observer(CreatePostRaw));
