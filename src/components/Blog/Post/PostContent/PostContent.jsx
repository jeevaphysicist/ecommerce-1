import Link from 'next/link';
import { Suspense } from 'react'
import 'quill/dist/quill.bubble.css'
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

const ReactQuill = dynamic(() => import('react-quill'), { // Dynamically import ReactQuill
  ssr: false, // Disable server-side rendering
});

export const PostContent = ({ blog }) => {
  var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size","video","code-block","font","clean"
  ];
  return (
    // <>
    //   <div className='post-top'>
    //     <h2>{blog.title}</h2>
    //     <p>{blog.subTitle}</p>
    //     <img src={blog.coverimage} className='js-img' alt='' />
    //     <ul className='post-top__info'>
    //       <li className='post-top__date'>
    //         <i className='icon-date'></i>
    //         {blog.date?.month} {blog.date.date}, {blog.date.year}
    //       </li>
    //       <li className='post-top__user'>
    //         <i className='icon-user2'></i>
    //         <a href='#/'>by {blog.authorName}</a>
    //       </li>
    //       <li className='post-top__watch'>
    //         <i className='icon-eye'></i>
    //         {blog.totalWatchCount}
    //       </li>
    //       <li className='post-top__comment'>
    //         <i className='icon-comment'></i>
    //         {blog.totalCommentCount}
    //       </li>
    //     </ul>
    //   </div>
    //   <div className='post-content'>
    //     <p>{blog.content}</p>

    //     <h6>{blog.titleTwo}</h6>
    //     <p>{blog.contentTwo}</p>
    //     <blockquote className='blockquote'>
    //       “{blog.quote.content}”
    //       <span className='blockquote-author'>{blog.quote.author}</span>
    //     </blockquote>
    //     <ul className='post-list'>
    //       {blog.postList.map((list, index) => (
    //         <li key={index}>
    //           <span>{list.title}</span>
    //           {list.content}
    //         </li>
    //       ))}
    //     </ul>
    //     <div
    //       className='discount discount-about js-img'
    //       style={{ backgroundImage: `url(${blog.discount.thumb})` }}
    //     >
    //       <div className='wrapper'>
    //         <div className='discount-info'>
    //           <span className='saint-text'>{blog.discount.silentText}</span>
    //           <h2>{blog.discount.title}</h2>
    //           <p>{blog.discount.content}</p>
    //           <ul>
    //             {blog.discount.attributes.map((attribute, index) => (
    //               <li key={index}>
    //                 <span>{attribute.title}</span> - {attribute.content};
    //               </li>
    //             ))}
    //           </ul>
    //           <Link href='/shop'>
    //             <a className='btn'>Shop now</a>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //     <p>{blog.contentThree}</p>
    //   </div>
    //   <div className='post-bottom'>
    //     <div className='post-bottom__info'>
    //       <div className='post-bottom__tags'>
    //         <span>Tags:</span>
    //         <ul>
    //           {blog.tags.map((tag, index) => (
    //             <li key={index}>
    //               <Link href='#/'>
    //                 <a>{tag.title}</a>
    //               </Link>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //       <div className='contacts-info__social'>
    //         <span>Share:</span>
    //         <ul>
    //           <li>
    //             <a href='#/'>
    //               <i className='icon-facebook'></i>
    //             </a>
    //           </li>
    //           <li>
    //             <a href='#/'>
    //               <i className='icon-twitter'></i>
    //             </a>
    //           </li>
    //           <li>
    //             <a href='#/'>
    //               <i className='icon-insta'></i>
    //             </a>
    //           </li>
    //           <li>
    //             <a href='#/'>
    //               <i className='icon-in'></i>
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div className='post-bottom__nav'>
    //       <a href='#/'>
    //         <i className='icon-arrow'></i>previous post
    //       </a>
    //       <a href='#/'>
    //         next post<i className='icon-arrow'></i>
    //       </a>
    //     </div>
    //   </div>
    // </>
    <Suspense>
    {
        blog ? 
        <div className='w-[100%] flex items-center justify-center'>
        
        <div className=''>
        <div className='post-top'>
        <h2 style={{marginBottom:"60px"}}>{blog.title}</h2>
        <img style={{marginBottom:"60px"}} src={blog.coverimage} alt="coverimage..." />

        </div>
        <ReactQuill
        value={blog.blogdata}
        readOnly={true}
        theme="bubble"
       
        formats={formats}
        modules={{ toolbar: false }}
        />
      </div>
        
      </div>
     
      :
      <div>No Blog Found</div>
    }
   </Suspense>
  );
};
