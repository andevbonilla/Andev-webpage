declare module '*.JPG' {
  const content: import('next/image').StaticImageData;
  export default content;
}
