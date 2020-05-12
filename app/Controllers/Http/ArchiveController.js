"use strict";

const Archive = use("App/Models/Archive");
const Task = use("App/Models/Task");

const Helpers = use("Helpers");

class ArchiveController {
  async create({ params, request, response }) {
    try {
      const task = await Task.findOrFail(params.id);

      const archives = request.file("file", {
        size: "1mb",
      });

      await archives.moveAll(Helpers.tmpPath("archives"), (file) => ({
        name: `${Date.now()}-${file.clientName}`,
      }));

      if (!archives.movedAll()) {
        return archives.errors();
      }

      //sem relacionamento

      // await Promise.all(
      //   archives
      //     .movedList()
      //     .map((item) =>
      //       Archive.create({ task_id: task.id, path: item.fileName })
      //     )
      // );

      //com relacionamento

      await Promise.all(
        archives
          .movedList()
          .map((item) => task.archives().create({ path: item.fileName }))
      );

      return response
        .status(200)
        .send({ message: "Files successfully uploaded" });
    } catch (err) {
      return response.status(500).send({ error: `Error: ${err.message}` });
    }
  }
}

module.exports = ArchiveController;
