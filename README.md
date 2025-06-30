# Saathi Backend Internship – Final Assignment

## Overview

This repository contains both tasks required for the Saathi.ai Backend Internship Final Assignment:

### ✅ Task 1: API Design & Partner Integration

- **Stack**: Node.js, Express.js, MongoDB Atlas, MySQL (AWS RDS)
- **Routes**:
  - `POST /visa-requirements`: Accepts normalized visa data
  - `GET /visa-requirements/:country`: Fetches visa info for a given country
- **Partners**:
  - Partner A (JSON API)
  - Partner B (HTML Scraper)

### ✅ Task 2: GenAI-Powered Query Parser

- **Stack**: Python, FastAPI
- **LLM**: Gemini API
- **Endpoint**: 
  - `POST /parse-query`: Accepts free-text and returns structured visa data

## Running Instructions

### 1. Backend (Node.js)

```bash
cd backend
npm install
npm start
