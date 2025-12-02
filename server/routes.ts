import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/registrations", async (req, res) => {
    try {
      const {
        fullName,
        nationalId,
        age,
        university,
        college,
        course,
        phone,
        email,
        guardianPhone,
        address,
        friends,
        photoUrl
      } = req.body;

      const result = await sql`
        INSERT INTO registrations (
          full_name,
          national_id,
          age,
          university,
          college,
          course,
          phone,
          email,
          guardian_phone,
          address,
          friends,
          photo_url
        ) VALUES (
          ${fullName},
          ${nationalId},
          ${age},
          ${university},
          ${college},
          ${course},
          ${phone},
          ${email},
          ${guardianPhone},
          ${address},
          ${JSON.stringify(friends)},
          ${photoUrl || null}
        )
        RETURNING *
      `;

      res.json({ success: true, data: result[0] });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ success: false, message: "Failed to submit registration" });
    }
  });

  app.get("/api/registrations", async (_req, res) => {
    try {
      const result = await sql`
        SELECT * FROM registrations
        ORDER BY created_at DESC
      `;
      res.json({ success: true, data: result });
    } catch (error) {
      console.error("Fetch registrations error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch registrations" });
    }
  });

  app.patch("/api/registrations/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const result = await sql`
        UPDATE registrations
        SET status = ${status}, updated_at = now()
        WHERE id = ${id}
        RETURNING *
      `;

      res.json({ success: true, data: result[0] });
    } catch (error) {
      console.error("Update status error:", error);
      res.status(500).json({ success: false, message: "Failed to update status" });
    }
  });

  app.delete("/api/registrations/:id", async (req, res) => {
    try {
      const { id } = req.params;

      await sql`
        DELETE FROM registrations
        WHERE id = ${id}
      `;

      res.json({ success: true });
    } catch (error) {
      console.error("Delete registration error:", error);
      res.status(500).json({ success: false, message: "Failed to delete registration" });
    }
  });

  return httpServer;
}
