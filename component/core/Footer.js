export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-5xl mx-auto text-center text-sm sm:text-base">
        <p className="font-medium tracking-wide">
          &copy; {new Date().getFullYear()} EventManager. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

