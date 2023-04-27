import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LikeModel } from "../../../models/LikeModel";
import { likeService } from "../../../services/likeServices";
import { notifyService } from "../../../services/notifyService";
import "./LikeButton.css";

interface LikeButtonProps {
    className?: string;
    vacationId: number
    isLiked: boolean;
    likesAmount: number
}

function LikeButton({ className, vacationId, isLiked, likesAmount }: LikeButtonProps): JSX.Element {


    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: isLiked ? likeService.removeLikeFromVacation : likeService.addLikeToVacation,
        onSuccess: () => {

            queryClient.invalidateQueries(["all"])
        },
        onError: (error) => notifyService.error(error),
    })

    const handleLikeClick = () => {
        mutation.mutate(vacationId)
    }

    return (
        <button className={`like-button ${className} ${isLiked ? 'liked' : ''}`}
            onClick={handleLikeClick}>
            <span className="heart-icon">&hearts;</span>
            <span className="like-text">{likesAmount}</span>
        </button>
    );
}

export default LikeButton;
