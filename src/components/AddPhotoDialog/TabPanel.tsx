interface ITabPanelProps {
  tab: number;
  index: number;
  className?: string;
}

const TabPanel: React.FC<ITabPanelProps> = ({
  children,
  tab,
  index,
  className
}) => {
  return (
    <div
      role="tabpanel"
      hidden={tab !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`option-${index}`}
      className={className}
    >
      {tab === index && <>{children}</>}
    </div>
  );
};

export default TabPanel;
