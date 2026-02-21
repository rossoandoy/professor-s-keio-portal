const Footer = () => {
  return (
    <footer className="py-8 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm font-body opacity-60">
          © {new Date().getFullYear()} Toshihiro Okubo · Keio University, Faculty of Economics
        </p>
      </div>
    </footer>
  );
};

export default Footer;
