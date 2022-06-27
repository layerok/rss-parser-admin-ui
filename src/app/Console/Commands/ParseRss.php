<?php

namespace App\Console\Commands;

use App\Models\Post;
use Illuminate\Console\Command;
use Symfony\Component\Console\Output\OutputInterface;

class ParseRss extends Command
{
    protected $signature = 'lifehacker:parse-rss';
    protected $description = 'parse lifehacker rss';


    public function handle()
    {
        if (!($x = simplexml_load_file('https://lifehacker.com/rss','SimpleXMLElement', LIBXML_NOCDATA))) {
            return;
        };

        Post::truncate();

        $items = $x->channel->item;
        $this->line("Start parsing rss feed");
        $bar = $this->output->createProgressBar(count($items));

        foreach ($items as $item)
        {
            $bar->advance();
            $post = new Post();
            $post->title = $item->title;
            $post->description = $item->description;
            $post->save();
        }
    }
}
