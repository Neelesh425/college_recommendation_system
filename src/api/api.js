const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// ── Helper ────────────────────────────────────────────────────────────────────

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `Request failed: ${res.status}`);
  }

  return res.json();
}


// ── API functions ─────────────────────────────────────────────────────────────

/**
 * POST /api/search
 * Sends student profile to backend, returns matched colleges.
 *
 * @param {Object} formData - values from SearchForm
 * @returns {Promise<{ total: number, results: Array }>}
 */
export async function searchColleges(formData) {
  // Map camelCase form fields → snake_case expected by FastAPI
  const payload = {
    jee_rank:        formData.jeeRank        ? parseInt(formData.jeeRank)        : null,
    wbjee_rank:      formData.wbjeeRank      ? parseInt(formData.wbjeeRank)      : null,
    class12_percent: parseFloat(formData.class12Percent),
    category:        formData.category       || "General",
    state:           formData.state          || "Both",
    branch:          formData.branch         || "Any Branch",
    college_type:    formData.collegeType    || "Any",
    affiliation:     formData.affiliation    || "Any",
    fees_range:      formData.feesRange      || "Any",
    sort_by:         formData.sortBy         || "rank",
  };

  return request("/api/search", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}


/**
 * GET /api/colleges/:id
 * Fetches full detail for a single college.
 *
 * @param {number} id - college ID
 * @returns {Promise<{ college: Object }>}
 */
export async function getCollege(id) {
  return request(`/api/colleges/${id}`);
}


/**
 * GET /api/health
 * Ping to check if the backend is reachable.
 *
 * @returns {Promise<{ status: string }>}
 */
export async function healthCheck() {
  return request("/api/health");
}