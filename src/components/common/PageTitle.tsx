interface PageTitleProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const PageTitle = ({ title, description, children }: PageTitleProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
};

export default PageTitle;