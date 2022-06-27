import {inject, observer} from "mobx-react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Overlay} from "../../components/Overlay";
import {useDebounce} from "../../hooks/useDebounce";


const PostsRaw = (
    {
        PostsStore: {
            items,
            fetch,
            destroy,
            loading,
            limits,
            setSelectedLimit,
            selectedLimit,
            totalPages,
            setPage,
            page,
            setSearch,
            setOrderDirection,
            setOrderProperty,
            sortDirection,
            sortProperty,
            count,
        }
    }
) => {
    const navigate = useNavigate();

    const debouncedFetch = useDebounce(() => {
        console.log('debounced');
        fetch()
    }, 500)


    useEffect(() => {
        fetch();
    },[])



    const renderPagination = () => {
        return <div>
            <select name="limit" id="" defaultValue={selectedLimit} onChange={(e) => {
                const value = e.target.value;
                setSelectedLimit(value);
                setPage(1);
                fetch();

            }}>
                {limits.map((limit) => (
                    <option key={limit}
                            value={limit}>
                        {limit}</option>
                ))}

            </select>
            {
                Array.apply(null, Array(totalPages)).map((v, i) => (
                    <button disabled={page === (i + 1)} onClick={() => {
                        setPage(i + 1);
                        fetch();
                    }} key={i}>{i + 1}</button>
                ))
            }
        </div>
    }

    const handleInput = (e) => {
        const value = e.target.value;
        if(value) {
            setSearch(value)

        } else {
            setSearch("");
        }

        debouncedFetch();
    }

    const SortButtons = ({
        property,
                         }) => {
        return <>
            <button onClick={() => {
                setOrderProperty(property);
                setOrderDirection('asc')
                fetch();
            }
            }>
                &#8593;
            </button>
            <button onClick={() => {
                setOrderProperty(property);
                setOrderDirection('desc');
                fetch();
            }
            }>
                &#8595;
            </button></>
    }

    return <div style={{width: '600px'}}>
        <button onClick={() => {
            navigate('/admin/posts/create')
        }}>Create post</button>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <h3>Posts ({count})</h3>
            <div>
                <input type="text" placeholder="search" onInput={handleInput}/>
            </div>
        </div>

        <div style={{position: 'relative', display: 'flex', flexDirection: 'column'}}>
            {loading && <Overlay/>}

            <table>
                <thead>
                <tr>
                    <th>
                        #
                        <SortButtons property={"id"}/>
                    </th>
                    <th style={{width: "400px"}}>
                        title
                        <SortButtons property={"title"}/>
                    </th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td >{item.title}</td>
                        <td>
                            <button onClick={() => {
                                navigate(`/admin/posts/${item.id}`)
                            }}>Edit</button>
                            <button onClick={() => {
                                destroy(item.id).then(() => {
                                    fetch()
                                })
                            }}>Delete</button>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
            {renderPagination()}
        </div>




    </div>
}

export const Posts = inject('PostsStore')(observer(PostsRaw));
