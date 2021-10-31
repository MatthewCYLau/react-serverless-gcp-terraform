// Imports the Google Cloud client library
const { Bigtable } = require("@google-cloud/bigtable");

// Instantiates a client
const bigtable = new Bigtable();

exports.readRows = async (req, res) => {
  // Gets a reference to a Cloud Bigtable instance and database
  const instance = bigtable.instance("react-serverless-instance");
  const table = instance.table("users-table");

  // Execute the query
  try {
    const prefix = "phone#";
    const rows = [];
    await table
      .createReadStream({
        prefix,
      })
      .on("error", (err) => {
        res.send(`Error querying Bigtable: ${err}`);
        res.status(500).end();
      })
      .on("data", (row) => {
        rows.push(
          `rowkey: ${row.id}, ` +
            `os_build: ${row.data["stats_summary"]["os_build"][0].value}\n`
        );
      })
      .on("end", () => {
        rows.forEach((r) => res.write(r));
        res.status(200).end();
      });
  } catch (err) {
    res.send(`Error querying Bigtable: ${err}`);
    res.status(500).end();
  }
};
