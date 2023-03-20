import './rust_learning_path.scss';

function RustLearningPathText() {
    return (
        <section className="text">
        <h4>My Rust Learning Path.</h4>
    <p className="text__paragraph">Recently someone have asked me how I learn Rust. And since I like DRY and Ctrl-P Ctrl-V approach I
    decided to write this article.  Please be advised: I’m not a Rust Guru or Senior Developer. I don’t
    claim to know better. With this in mind let’s proceed:
    <ol>
<li>Learning Rust takes time. Be prepared.</li>

<li>Albeit Rust took many things from other languages it implement it differently, refrain to compare.
At the end you learning Rust not writing a review Rust vs ..</li>

<li>Rust is a high level language which takes different approach towards memory management. So if you do
not understand things like: Stack, Stack Frame, Heap, Pointer, memory Allocation, de-reference of Pointer,
memory Layout and Padding. Better learn about them. You don't need them immediately, but sooner or later
you will.</li> 
<li>Read The Book. Don't get upset if something is not clicking the first time. For me reading The Book
was a daunting task. And from time to time I still refresh some articles. I was so eager to start
coding so I skim some articles. The Book has a lot of goodness inside. But if you like my approach then;
read The Book, Rust by Examples, Rust Reference, Rust API. Tinker with the code on play.rust-lang.org/,
ask questions on forum, read answers on stackoverflow. Repeat. Don't worry, you have to learn how to
crawl before you can walk.</li>
<li>Understand traits. Traits are very important. At this point you better have knowledge of things
from paragraph #3. And have seen, at least once, video from paragraph #10.Learn about standard traits:
Into, From, Deref, Ord, Eq, PartialEq.. the more the merrier.</li>
<li>Still feel unrest about raw pointers *const and *mut? What is Borrowing, Copy, Clone? What is
reference in Rust and how it affects your life?</li>
<li>Get used to Generics, type Alias, Lifetimes.</li>
<li>What are smart  pointers, what is Pin? And what Cows are doing in Rust? Have you seen video from
paragraph #10 already?</li>
<li>Start to solve exercises from: <a href="https://github.com/rust-lang/rustlings/">  Rustlings  </a></li>
<li>Watch this video: 
    <a href="https://www.youtube.com/watch?v=rDoqT-a6UFg&t=1942s">  Visualizing memory layout of Rust's data types  </a>
    this video was my turning point. It's a Jem!</li>
<li>Start solving exercises from: <a href="https://exercism.org/"> Exercism.org </a> You’ll be glad to know that you can ask for help
from mentors there. And if at some point you may think that something is wrong with the exercise,
simply know it isn't.</li>
<li>By this point you must know about many things like: code organization, error handling, iterators,
trait system etc. I deliberately left asynchronous and multi threading it’s already a lot on the plate. 
14. Now you probably want to see more examples of the code, well there are usual places like  Rust by
Examples, and even sometime Rust Reference. And you saw them already, I'm sure. There is more, for
example, on exercism.org it's possible to peak in other people's solution after you commit yours.
Spoiler Alert! It could make you hate yourself. Please, don't.</li>
<li>Since Rust is an opensource project I cloned many books to local repo and stated to edit them,
mostly it's bottom page notes and addons, links to other material, sometime example. `mdbook` is very
useful crate. I love technology! Here came the time when I can write in the book and no one scolds me!
I wonder what authors would tell if they see my mess, though.</li>
<li>It's time to do something by yourself. I started by exploring web frameworks, Actix, Roket.
Started project, just to see how it goes.</li>
<li>Take time and read sources for your dependencies. Github projects are my sources of examples. I have 
started from `itoa`. It didn't came to me, was too advance. Still afraid to look at it again. But it
definitely worth to go to the dependency repository, have a look around, clone it, tinker with examples
and tests, add one more star to the repository. And maybe it will be the right time for you to commit.</li>
<li>Read sources for standard libraries. Use crates.io to find libraries and docs.rs to find and read
documentation of libraries.</li>
<li>Somewhere after paragraph #7, if not earlier, you probably started to look in
<a href="https://doc.rust-lang.org/nomicon/"> Nomicon </a> and 
<a href="https://rust-unofficial.github.io/patterns/intro.html"> Rust Design Patterns </a> and numerous Cookbooks.
That is right, knowledge about Rust is scattered all over the web.</li>
<li>Few words about macros. Remember school? There use to be  exercises with asterisk. In Rust first
time you will come across such exercise on page number six of The Book. To learn how to write macros
simply start with The Book and follow links. Again when I read sources for dependencies I look at
the code for macros and try to figure out what it does. Macros are useful and you will see them a lot.</li>
<li><a href="https://github.com/rust-unofficial/too-many-lists">
Learning Rust With Entirely Too Many Linked Lists </a>. I dared to read it after a month of reading
    The Book. On second chapter the author squeeze tears out of me, three months later I tried again and
    this time followed to chapters with unsafe code, Miri and Rust Nightly where eventually get totally
    lost again. While reading I have read lines where author has told that to write one of these chapters
    it took here, if I remember correctly, eight!! years and it, actually, gave me some hope.
    Recollect paragraph #1.</li>
    </ol></p>
        </section>
    );
}
export default function RustLearningPath(){
    return (
        <div className="main-content-holder">
            <RustLearningPathText/>
        </div>
    );
}

