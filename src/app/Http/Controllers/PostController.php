<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $offset = $request->input('offset');
        $limit = $request->input('limit');
        $search = $request->input('search');
        $order_property = $request->input('order_property');
        $order_direction = $request->input('order_direction');
        $query = Post::with('categories');

        if($search) {
            $query->where('title', 'like', '%'. $search .'%');
        }

        $count = $query->count();

        if($offset) {
            $query->offset($offset);
        }

        if($limit) {
            $query->limit($limit);
        }

        if($order_property && $order_direction) {
            $query->orderBy($order_property, $order_direction);
        }

        $posts = $query->get();

        return response()->json([
            'data' => $posts,
            'count' => $count
        ]);
    }

    public function store(Request $request)
    {
        $book = Post::create([
            'creator' => $request->creator,
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return new PostResource($book);
    }

    public function show($id)
    {
        $post = Post::with('categories')->where('id', $id)->first();
        return new PostResource($post);
    }

    public function update(Request $request, Post $post)
    {
        $post->categories()->delete();

        //return response()->json(['error' => 'You can only edit your own books.'], 403);
        $categories = $request->input('categories');
        if(isset($categories)) {
            foreach($categories as $category) {
                Category::create([
                    'title' => $category,
                    'post_id' => $post->id
                ]);
            }
        }

        $post->update($request->only(['title', 'description', 'creator', 'link', 'pubDate']));

        return new PostResource($post);
    }


    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json(null, 204);
    }
}
