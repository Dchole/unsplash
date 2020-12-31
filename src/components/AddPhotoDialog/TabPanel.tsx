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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={className}
    >
      {tab === index && <>{children}</>}
    </div>
  );
};

export default TabPanel;
