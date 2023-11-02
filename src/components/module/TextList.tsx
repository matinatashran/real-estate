import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";

interface ITextListProps {
  listTitle: string;
  itemList: string[];
  setItemList: Dispatch<SetStateAction<string[]>>;
}

interface IChangeType {
  e: ChangeEvent<HTMLInputElement>;
  index: number;
}

const TextList: FC<ITextListProps> = ({ listTitle, itemList, setItemList }) => {
  const ChangeValueHandler = ({ e, index }: IChangeType) => {
    const list = [...itemList];
    list[index] = e.target.value;
    setItemList(list);
  };

  const deleteHandler = (index: number) => {
    const list = [...itemList];
    list.splice(index, 1);
    setItemList(list);
  };

  return (
    <div className="w-full flex flex-col items-start gap-2 md:w-3/5">
      <span className="px-2 py-1 text-sm rounded-xl bg-stone-100 shadow-md text-stone-700">
        {listTitle}
      </span>
      {itemList.map((item, index) => (
        <div key={index} className="w-full flex items-center gap-2">
          <input
            value={item}
            onChange={(e) => ChangeValueHandler({ e, index })}
            type="text"
            className="w-3/5 text-sm p-2 rounded-md border focus:outline-none focus:shadow-lg transition duration-300 placeholder:text-gray-200"
          />
          <button
            onClick={() => deleteHandler(index)}
            className="p-2 border text-red-500 text-sm rounded-md"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
      <button
        onClick={() => setItemList([...itemList, ""])}
        className="flex items-center gap-2 bg-black text-white py-1 px-3 rounded-md my-2"
      >
        <span className="text-sm">Add</span>
        <BiAddToQueue className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TextList;
