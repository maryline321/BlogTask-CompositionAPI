<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Resources\PostResource;
use App\Http\Requests\CreatePostRequest;

class PostController extends Controller
{
    public function store(CreatePostRequest $request)
    {
        $post = Post::create($request->validated());

        return response()->json(['message' => 'Post created successfully', 'post' => $post], 201);
    }

    public function index()
    {
        $posts = Post::with('tags')->get();
        return PostResource::collection($posts);
    }

    public function show(Post $id)
    {
        return new PostResource($id);
    }
}
