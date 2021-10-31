const { Bigtable } = require("@google-cloud/bigtable");
const bigtable = new Bigtable();

exports.writeRow = async (req, res) => {
  const instance = bigtable.instance("react-serverless-instance");
  const table = instance.table("users-table");

  try {
    const timestamp = new Date();
    const rowToInsert = {
      key: "phone#4c410523#20190501",
      data: {
        stats_summary: {
          connected_cell: {
            value: 1,
            timestamp,
          },
          connected_wifi: {
            value: 1,
            timestamp,
          },
          os_build: {
            value: "PQ2A.190405.003",
            timestamp,
          },
        },
      },
    };

    await table.insert(rowToInsert);

    res.status(200).end();
  } catch (err) {
    res.send(`Error writing Bigtable: ${err}`);
    res.status(500).end();
  }
  console.log(`Successfully wrote row ${rowToInsert.key}`);
};
