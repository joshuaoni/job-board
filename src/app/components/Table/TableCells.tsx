interface ListWithCounterProps {
  items: string[];
  displayCount?: number;
  badgeClassName?: string;
}

const ListWithCounter = ({
  items,
  displayCount = 1,
  badgeClassName = "bg-gray-100 text-gray-600",
}: ListWithCounterProps) => {
  const displayItems = items.slice(0, displayCount);
  const remainingCount = items.length - displayCount;

  return (
    <div className="flex justify-start items-center overflow-hidden">
      <span className="text-sm text-black truncate" title={items.join(", ")}>
        {displayItems.join(", ")}
      </span>
      {remainingCount > 0 && (
        <span
          className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${badgeClassName}`}
          title={items.slice(displayCount).join(", ")}
        >
          +{remainingCount}
        </span>
      )}
    </div>
  );
};

export const JobType = ({ type }: { type: string }) => {
  return (
    <div className="w-full h-[19px] flex items-center justify-start">
      <p className="font-inter font-normal text-[16px] leading-[100%] tracking-[5%] text-black">
        {type}
      </p>
    </div>
  );
};

export const JobSkills = ({ skills }: { skills: string }) => {
  const skillsList = skills.split(",").map((skill) => skill.trim());
  return (
    <div className="w-full flex justify-start items-center gap-2 overflow-hidden">
      <ListWithCounter items={skillsList} />
    </div>
  );
};

export const Languages = ({ languages }: { languages: string }) => {
  const languageList = languages.split(",").map((lang) => lang.trim());
  return (
    <div className="w-full flex justify-start items-center overflow-hidden">
      <ListWithCounter items={languageList} />
    </div>
  );
};

export const Tags = ({ tags }: { tags: string }) => {
  const tagsList = tags.split(",").map((tag) => tag.trim());
  return (
    <div className="w-full overflow-hidden">
      <ListWithCounter
        items={tagsList}
        badgeClassName="bg-blue-50 text-blue-600"
      />
    </div>
  );
};
