import React from "react";

export default function PaymentModal({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void }) {
    return (
        isOpen && (
            <div className="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 h-screen w-full flex items-center justify-center">
                <div className="max-h-[90vh] p-8 border w-full max-w-[50vw  ] shadow-lg rounded-md bg-white overflow-y-auto">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900">Modal Title</h3>
                        <div className="mt-2 px-7 py-3">
                            <p className="text-lg text-gray-500">Modal Body</p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. At vero officiis repellat
                                soluta numquam saepe reiciendis laudantium tempore accusamus ab ex esse, ut a sequi
                                architecto et consequatur molestias itaque nisi maiores modi cumque minus. Tempore, ut,
                                labore ipsum dolorum enim ipsam, consequuntur veritatis modi sunt nobis architecto at
                                neque! Quibusdam voluptatem illum, atque, ducimus est modi similique placeat quaerat sit
                                recusandae labore nulla voluptatibus iste laudantium eligendi hic tempore adipisci iure
                                ullam provident! Quasi blanditiis est eius, exercitationem explicabo provident officiis
                                eum quaerat aliquid. Eligendi modi saepe aperiam facere esse sunt quia fugit dolore
                                fuga, reiciendis ipsa, asperiores provident magni libero commodi vitae. Quia blanditiis
                                tempore, enim quod sit et animi mollitia aliquam illum maiores non cupiditate sed
                                similique, repellendus voluptates. Temporibus autem provident assumenda voluptas
                                corporis aliquid quibusdam sunt ea in velit maxime deleniti illo, tempora tenetur nemo
                                quasi sapiente adipisci blanditiis quas voluptatem? Sint earum tenetur iste.
                            </p>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
