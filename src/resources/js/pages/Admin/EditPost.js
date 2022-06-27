import {inject, observer} from "mobx-react";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const EditPostRaw = (
    {
        PostsStore: {
            loading,
            show,
            item,
            update
        }
    }
) => {
    const params = useParams();
    const navigate = useNavigate();
    console.log(params);
    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        categories: [],
        link: '',
        pubDate: '',
        guid: ''
    })

    const [category, setCategory] = useState("");

    useEffect(() => {
        show(params.id).then((item) => {
            setInitialValues(item);
        });
    }, [params.id])

    if(loading) {
        return "...post information is loading";
    }

    const handleEdit = (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const title = fd.get('title');
        const description = fd.get('description');
        const link = fd.get('link');
        const pubDate = fd.get('pubDate');
        const categories = fd.getAll('categories');
        const updatedData = {
            title,
            description,
            categories,
            link,
            pubDate
        };
        update(item.id, updatedData);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setInitialValues(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return <>
        <h3>Edit post {item?.id}</h3>
        <form onSubmit={handleEdit} style={{display: 'flex'}}>

            <div>
                <div>
                    <label>
                        title: <br/>
                        <input type="text" name="title" value={initialValues.title} onChange={handleChange}/>
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
                            defaultValue={initialValues.description}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        link: <br/>
                        <input type="text" name="link" value={initialValues.link} onChange={handleChange}/>

                    </label>
                </div>
                <div>
                    <label>
                        publication date: <br/>
                        <input type="text" name="pubDate" value={initialValues.pubDate} onChange={handleChange}/>

                    </label>
                </div>
                <div>
                    <label>
                        <button>Save changes</button>
                        <button onClick={() => {
                            navigate('/admin/posts')
                        }}>Back</button>
                    </label>
                </div>
            </div>
            <div style={{marginLeft: "36px"}}>

                categories: <br/>
                <ul>
                    {initialValues.categories.map((category) => (
                        <li key={category.id}>
                            <button title={"delete category"} onClick={(e) => {
                                e.preventDefault();
                                setInitialValues({
                                    ...initialValues,
                                    categories: [
                                        ...initialValues.categories.filter((item) => item.id !== category.id)
                                    ]
                                })
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
                                setInitialValues({
                                    ...initialValues,
                                    categories: [
                                        ...initialValues.categories,
                                        {
                                            title: category,
                                            id: Math.floor(Math.random() * 100)
                                        }
                                    ]
                                })
                                setCategory("");
                            }
                        }}>add category</button></li>
                </ul>


            </div>





        </form>

    </>

}

export const EditPost = inject('PostsStore')(observer(EditPostRaw));
