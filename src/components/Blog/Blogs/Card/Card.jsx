import Link from 'next/link';

export const Card = ({ blog }) => {
  const { title, id, image, shortDescription, date } = blog;
  return (
    <div className='blog-item'>
      <Link href={`/blog/${blog._id}`}>
        <a className='blog-item__img'>
          <img src={blog.coverimage} className='js-img' alt='' />
          <span className='blog-item__date'>
            <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short' })}
</span> {new Date(blog.createdAt).toLocaleDateString(undefined, {  day: '2-digit' })
}
          </span>
        </a>
      </Link>
      <Link href={`/blog/${blog._id}`}>
        <a className='blog-item__title'>{title}</a>
      </Link>
      <p>{shortDescription}</p>
      <Link href={`/blog/${blog._id}`}>
        <a className='blog-item__link'>
          Read more <i className='icon-arrow-md'></i>
        </a>
      </Link>
    </div>
  );
};
