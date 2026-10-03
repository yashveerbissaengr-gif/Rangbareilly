"use client";

import React, { useState } from "react";
import { SpecItem } from "@/lib/product-palmonas";
import { Plus, Minus } from "lucide-react";

interface ProductAccordionsProps {
  descriptionHtml: string;
  specs: SpecItem[];
  supplierInfo: SpecItem[];
  returnsInfo: {
    returnDays: number;
    exchangeDays: number;
    description: string[];
  };
}

export function ProductAccordions({
  descriptionHtml,
  specs,
  supplierInfo,
  returnsInfo,
}: ProductAccordionsProps) {
  // Default first accordion (Description) to open or open all
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    description: true,
    specification: false,
    supplier: false,
    returns: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-full my-8 divide-y divide-gray-100">
      {/* 1. Description */}
      <div className="py-2">
        <button
          type="button"
          onClick={() => toggleSection("description")}
          className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
        >
          <span className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#E63956] transition-colors">
            Description
          </span>
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center transition-transform duration-200">
            {openSections.description ? (
              <Minus className="w-4 h-4 stroke-[3]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[3]" />
            )}
          </div>
        </button>

        {openSections.description && (
          <div className="pb-6 pt-1 text-sm text-gray-700 leading-relaxed font-normal animate-in fade-in duration-200">
            <div 
              className="mb-4 prose prose-sm max-w-none prose-p:text-gray-700 prose-a:text-[#E63956]"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }} 
            />
            <div className="bg-[#FAF8F5] border border-[#EBE5DC] rounded-xl p-4 mt-3">
              <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                Style & Care Tip:
              </h5>
              <p className="text-xs text-gray-600">
                To maximize your piece’s radiant shine, gently wipe with a soft microfiber cloth after wear. Keep away from harsh perfumes, pool chlorine, and hair sprays.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 2. Specification */}
      <div className="py-2">
        <button
          type="button"
          onClick={() => toggleSection("specification")}
          className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
        >
          <span className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#E63956] transition-colors">
            Specification
          </span>
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center transition-transform duration-200">
            {openSections.specification ? (
              <Minus className="w-4 h-4 stroke-[3]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[3]" />
            )}
          </div>
        </button>

        {openSections.specification && (
          <div className="pb-6 pt-1 animate-in fade-in duration-200">
            <div className="rounded-xl border border-gray-200 overflow-hidden text-xs sm:text-sm">
              <table className="w-full text-left">
                <tbody>
                  {specs.map((s, idx) => (
                    <tr
                      key={s.label}
                      className={idx % 2 === 0 ? "bg-[#FAF9F6]" : "bg-white"}
                    >
                      <td className="py-2.5 px-4 font-bold text-gray-800 w-1/3 border-r border-gray-200/60">
                        {s.label}
                      </td>
                      <td className="py-2.5 px-4 text-gray-700 font-normal">
                        {s.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 3. Supplier Information */}
      <div className="py-2">
        <button
          type="button"
          onClick={() => toggleSection("supplier")}
          className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
        >
          <span className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#E63956] transition-colors">
            Supplier Information
          </span>
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center transition-transform duration-200">
            {openSections.supplier ? (
              <Minus className="w-4 h-4 stroke-[3]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[3]" />
            )}
          </div>
        </button>

        {openSections.supplier && (
          <div className="pb-6 pt-1 animate-in fade-in duration-200">
            <div className="rounded-xl border border-gray-200 overflow-hidden text-xs sm:text-sm">
              <table className="w-full text-left">
                <tbody>
                  {supplierInfo.map((s, idx) => (
                    <tr
                      key={s.label}
                      className={idx % 2 === 0 ? "bg-[#FAF9F6]" : "bg-white"}
                    >
                      <td className="py-2.5 px-4 font-bold text-gray-800 w-1/3 border-r border-gray-200/60">
                        {s.label}
                      </td>
                      <td className="py-2.5 px-4 text-gray-700 font-normal">
                        {s.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 4. Returns */}
      <div className="py-2">
        <button
          type="button"
          onClick={() => toggleSection("returns")}
          className="w-full py-4 flex items-center justify-between text-left group cursor-pointer"
        >
          <span className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#E63956] transition-colors">
            Returns
          </span>
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center transition-transform duration-200">
            {openSections.returns ? (
              <Minus className="w-4 h-4 stroke-[3]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[3]" />
            )}
          </div>
        </button>

        {openSections.returns && (
          <div className="pb-6 pt-1 animate-in fade-in duration-200 text-sm text-gray-700 space-y-3 font-normal">
            {returnsInfo.description.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E63956] mt-2 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
