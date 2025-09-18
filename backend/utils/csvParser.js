import { parse } from "csv-parse";

const parseCSV = (buffer) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const parser = parse({ columns: true, skip_empty_lines: true });

    parser.on("readable", () => {
      let record;
      while ((record = parser.read())) {
        results.push(record);
      }
    });

    parser.on("error", (err) => reject(err));
    parser.on("end", () => resolve(results));

    parser.write(buffer);
    parser.end();
  });
};

export default parseCSV;
